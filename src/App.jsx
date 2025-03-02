import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentView from "./ContentView";
import OptifineView from "./OptifineView";
import InstalledView from "./InstalledView";
import AlreadyInstalledView from "./AlreadyInstalledView";

function App() {
    return (
        <body
            style={{
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                padding: "0",
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<ContentView />} />
                    <Route path="/optifine" element={<OptifineView />} />
                    <Route path="/success" element={<InstalledView />} />
                    <Route
                        path="/already-installed"
                        element={<AlreadyInstalledView />}
                    />
                </Routes>
            </Router>
        </body>
    );
}

export default App;
