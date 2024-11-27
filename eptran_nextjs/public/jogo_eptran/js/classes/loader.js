class Loader {
    static progress = 0;
    static listSize = 0;
    static listeners = [];

    static addListener(callback) {
        Loader.listeners.push(callback);
    }

    static removeListener(callback) {
        Loader.listeners = Loader.listeners.filter(listener => listener !== callback);
    }

    static triggerOnload() {
        Loader.listeners.forEach(listener => listener());
    }

    static addToList() {
        Loader.listSize++;
    }

    static incrementProgress() {
        Loader.progress++;
        if (Loader.progress >= Loader.listSize) {
            Loader.triggerOnload();
        }
    }

    static reset() {
        Loader.progress = 0;
        Loader.listSize = 0;
    }
}