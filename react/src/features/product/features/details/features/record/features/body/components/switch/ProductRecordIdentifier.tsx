import {AbbreviatedMobileText} from '../../../../../../../../../../util/components/AbbreviatedMobileText';

interface Params {
    children: any;
    doAbbreviate: boolean;
}

/**
 * Render a component that represents an instance of a ProductRecord
 *
 * @param children
 * @param isMobile
 */
export function ProductRecordIdentifier({children, doAbbreviate}: Params) {
    let inner;
    if (typeof children === 'string') {
        if (children === 'unknown') {
            inner = null;
        } else {
            if (!doAbbreviate) {
                inner = children;
            } else {
                inner = <AbbreviatedMobileText scheme="last" text={children}/>;
            }
        }
    } else {
        inner = children;
    }
    return <div itemScope itemType="https://schema.org/Person">{inner}</div>
}