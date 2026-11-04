const STORAGE_KEY = 'theme';

function createTheme() {
    let dark = $state(false);

    return {
        get dark() { return dark; },

        init() {
            const stored = localStorage.getItem(STORAGE_KEY);
            dark = stored === 'dark';
            this.apply();
        },

        toggle() {
            dark = !dark;
            localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
            this.apply();
        },

        apply() {
            document.documentElement.classList.toggle('dark', dark);
        }
    };
}

export const theme = createTheme();
