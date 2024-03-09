import { Revenue } from './definitions';
export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const formateDate = (dateStr: string, locale: string = 'en-US') => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    const formater = new Intl.DateTimeFormat(locale, options);
    return formater.format(date)
}


export const generateYAxis = (revenues: Revenue[]) => {
    const yAxisLabel = [];
    const highestRecord = Math.max(...revenues.map((revenue: Revenue) => revenue.revenue));
    // console.log(highestRecord); // 4800 
    const topLebel = Math.ceil(highestRecord / 1000) * 1000;
    // console.log(topLebel); // 5000

    for (let i = topLebel; i >= 0; i -= 1000) {
        // console.log(i); 5000 4000 3000 2000 1000 0
        yAxisLabel.push(`$${i / 1000}k`);
    }
    // console.log(yAxisLabel);
    return { yAxisLabel, topLebel };
}


export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1]
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
}