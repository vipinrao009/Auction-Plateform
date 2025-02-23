export const generateToken = (user, message, statusCode, res) => {
    try {
        const token = user.generateJsonWebToken();

        const cookieOptions = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,  // Protects against XSS attacks
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict" // Helps prevent CSRF attacks
        };

        res
            .cookie("token", token, cookieOptions)
            .status(statusCode)
            .json({
                success: true,
                message,
                user,
                token
            });

    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
