"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseAndMixEmail = reverseAndMixEmail;
function reverseAndMixEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('El formato del correo no es válido.');
    }
    const reversedEmail = email.split('').reverse().join('');
    const mixAlgorithm = (str) => {
        const indices = [3, 1, 4, 0, 2];
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const index = indices[i % indices.length];
            result += str[(i + index) % str.length];
        }
        return result;
    };
    const mixedEmail = mixAlgorithm(reversedEmail);
    return mixedEmail;
}
//# sourceMappingURL=generateGooglePassword.util.js.map