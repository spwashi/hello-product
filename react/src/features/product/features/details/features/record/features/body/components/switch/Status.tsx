interface Params {children: any;}

/**
 * Render a component that represents the "status" of a ProductRecord
 * @param children
 */
export function Status({children}: Params) {
    let color: string;
    switch (children) {
        case 'UPCOMING':
            color = 'blue';
            break;
        case 'EXPIRED':
            color = 'red';
            break;
        case 'ACTIVE':
            color = 'green';
            break;
        default:
            color = 'grey';
            break;
    }
    return <div style={{color}}>{children.toLowerCase()}</div>
}