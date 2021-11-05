export const currentTime = (): string =>  {
    const today  = new Date();
    const date   = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const time   = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return `${date} ${time}`;
}