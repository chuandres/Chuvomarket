export const clock = ():string => {
    let date = new Date();
    let hour = date.getHours();
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return time;
}