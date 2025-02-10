import 'next';

declare module 'next' {
    interface NextPage {
        layout?: 'Auth' | 'Default';
    }
}