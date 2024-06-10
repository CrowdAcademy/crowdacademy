// Helper function to capitalize and replace underscores with spaces
export const formatString = (str) => {
    // Convert the entire string to lowercase
    const lowerCasedStr = str.toLowerCase();

    // Replace underscores and periods with spaces, remove numbers, and capitalize the first letter of each word
    return lowerCasedStr
        .replace(/[_\.]/g, ' ')
        .replace(/\d/g, '')
        .replace(/\b\w/g, char => char.toUpperCase());
};

export const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
};

export const capitalize = (str) => {
    if (str.length === 0) return str;
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
