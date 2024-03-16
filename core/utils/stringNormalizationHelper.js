module.exports = function stringNormalizer(text) {
    // Normalize line endings to '\n' (Unix format)
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}