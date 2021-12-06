interface Params {
    children: any;
    doAbbreviate: boolean;
}

/**
 * Render a Date
 *
 * @param children
 * @param isMobile
 */
export function Date({children, doAbbreviate}: Params) {
    if (typeof children !== 'string') return children;
    return (
        <time dateTime={children} data-abbreviate="true">{
            children.split('-').map(
                (date: string, key: number) => {
                    const hyphen  = key ? '-' : '';
                    const element = <span>{doAbbreviate ? `${date}`.slice(-2) : date}</span>;
                    return <span key={date + key}>{hyphen}{element}</span>;
                },
            )
        }</time>
    )
}