// Helper function to capitalize and replace underscores with spaces
export const formatString = (str) => {
    return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};