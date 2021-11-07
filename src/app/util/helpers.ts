export const currentTime = (): string =>  {
    const today  = new Date();
    const date   = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
    const time   = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return `${time} ${date}`;
}