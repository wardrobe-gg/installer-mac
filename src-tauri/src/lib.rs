use std::fs::{self, OpenOptions};
use std::io::{self, BufRead, Write};
use std::path::Path;
use std::process::Command;
use std::process;


#[tauri::command]
async fn install_optifine() -> Result<String, String> {
    let hosts_path = "/etc/hosts";
    let line_to_add = "51.68.220.202 s.optifine.net # INSERTED BY WARDROBE";

    // Check if already installed first
    if is_already_installed(hosts_path, line_to_add)? {
        return Ok("already-installed".to_string());
    }

    match modify_hosts_file(hosts_path, line_to_add) {
        Ok(_) => Ok("success".to_string()),
        Err(_) => {
            match modify_hosts_file_with_admin(line_to_add) {
                Ok(_) => Ok("success".to_string()),
                Err(e) => Err(format!("Failed to modify hosts file: {}", e)),
            }
        }
    }
}

fn is_already_installed(hosts_path: &str, line_to_add: &str) -> Result<bool, String> {
    let file = fs::File::open(hosts_path).map_err(|e| e.to_string())?;
    let reader = io::BufReader::new(file);
    
    for line in reader.lines() {
        if let Ok(existing_line) = line {
            if existing_line.trim() == line_to_add.trim() {
                return Ok(true);
            }
        }
    }
    Ok(false)
}

fn modify_hosts_file(hosts_path: &str, line_to_add: &str) -> io::Result<()> {
    if !Path::new(hosts_path).exists() {
        return Err(io::Error::new(
            io::ErrorKind::NotFound,
            "Hosts file not found",
        ));
    }

    let mut file = OpenOptions::new().append(true).open(hosts_path)?;
    writeln!(file, "{}", line_to_add)?;
    
    Ok(())
}

fn modify_hosts_file_with_admin(line_to_add: &str) -> io::Result<()> {
    let script = format!(
        r#"
        set warningText to "Wardrobe needs to modify system files to install."
        set detailText to "Administrator privileges are required to modify the file. This is completely safe, but we understand your hesitation. \nYou can view the source-code for this installer at https://github.com/wardrobe-gg/installer-mac, or ask in our discord."
        
        tell application "System Events"
            activate
            set theResponse to display dialog warningText & return & return & detailText ¬
                with title "Wardrobe" ¬
                buttons {{"Cancel", "Continue"}} ¬
                default button "Continue" ¬
                with icon caution ¬
                giving up after 120
            
            if button returned of theResponse is "Continue" then
                do shell script "echo '{}' >> /etc/hosts" with administrator privileges
            else
                error "User cancelled the operation"
            end if
        end tell
        "#,
        line_to_add.replace("'", "'\"'\"'")
    );

    let status = Command::new("osascript")
        .arg("-e")
        .arg(&script)
        .status()?;

    if status.success() {
        Ok(())
    } else {
        Err(io::Error::new(
            io::ErrorKind::Other,
            "Operation cancelled or failed",
        ))
    }
}


#[tauri::command]
async fn exit_app() {
    process::exit(0);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![install_optifine, exit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
