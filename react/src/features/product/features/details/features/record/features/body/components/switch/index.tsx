import {useIsMobile} from '../../../../../../../../../../util/hooks/useWindowWidth';
import {ProductRecordIdentifier} from './ProductRecordIdentifier';
import {Status} from './Status';
import {Date} from './Date';

/**
 * Renders a cell of information about a record
 * @param children
 * @param attr
 * @constructor
 */
export default function ProductRecordInfoRenderer({children, attr}: { children: any, attr: string }) {
    const isMobile = useIsMobile();
    switch (attr) {
        case 'creationDate':
        case 'dateUpdated':
            return (
                <Date doAbbreviate={isMobile}>{
                    children
                }</Date>
            )
        case 'primaryRelatedProduct':
        case 'record':
            return (
                <ProductRecordIdentifier doAbbreviate={isMobile}>{
                    children
                }</ProductRecordIdentifier>
            )
        case 'status':
            return (
                <Status>{
                    children
                }</Status>
            );
        default:
            return children;
    }
}