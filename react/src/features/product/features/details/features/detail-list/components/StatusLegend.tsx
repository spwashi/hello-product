function toTitle(status: string): string {
    return `${status}`[0] + `${status}`.slice(1).toLowerCase();
}
function getClassNameForStatus(status: string): string {
    return `status--${(`${status}`).toLowerCase()}`;
}

/**
 * Represents a set of statuses
 *
 * @param statuses
 * @constructor
 */
export function StatusLegend({statuses}: { statuses: Set<string> }) {
    return <>{
        Array.from(statuses)
             .map(
                 status => {
                     const title     = toTitle(status);
                     const className = getClassNameForStatus(status);
                     return (
                         <div key={title} data-legendkey={title} className={className}><span>{title}</span></div>
                     );
                 },
             )
    }</>;
}