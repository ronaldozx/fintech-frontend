import { AnimatePresence, motion } from "framer-motion";
import { Login } from "./login";
import { useState } from "react";
import { Register } from "./register";
import { Container } from "./style";

export function AuthScreen() {
const [screen, setScreen] = useState<"login" | "register">("login");

    return (
        <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait">
                {screen === "login" ? (
                    <motion.div
                        key="login"
                        initial={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Container>
                            <Login onRegister={() => setScreen("register")} />
                        </Container>
                    </motion.div>
                ) : (
                    <motion.div
                        key="register"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Container>
                            <Register onLogin={() => setScreen("login")} />
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}