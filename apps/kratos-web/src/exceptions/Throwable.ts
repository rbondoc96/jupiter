export default abstract class Throwable extends Error {
    public abstract override readonly name: string;

    protected constructor(
        public readonly displayName: string,
        public readonly message: string,
    ) {
        super(message);
    }
}
