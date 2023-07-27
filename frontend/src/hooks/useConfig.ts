export const useConfig = () => {

    const backendBaseURL = process.env.REACT_APP_Backend_BASE_URL;

    return {
        backendBaseURL
    }
}