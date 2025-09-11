export const dateFormatter = (date: string) => {

    const givenDate = new Date(date);

    const formattedDate = givenDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });


    return formattedDate;
}