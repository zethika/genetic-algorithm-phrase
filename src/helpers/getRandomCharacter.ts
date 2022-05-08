/**
 * Returns a random character from the defined character set
 */
export default function (){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;-_æøåÆØÅ?!&%"\'';
    return characters[Math.floor(Math.random()*characters.length)]
}