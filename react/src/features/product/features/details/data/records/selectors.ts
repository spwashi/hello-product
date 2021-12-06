import {I_ProductRecord, IndexedDetailAggregate} from '../../packages/indexing/reducer';

export function record_selectName(record: I_ProductRecord) {
    return record.relatedProduct.name;
}
export function record_selectCreationDate(record: I_ProductRecord) {
    return record.detail.creationDate;
}
export function record_selectDateUpdated(record: I_ProductRecord) {
    return record.detail.updateDate;
}
export function record_selectDetailStatus(record: I_ProductRecord) {
    return record.detail.status;
}
export function getEmptyDetailAggregator() {
    return {relatedProducts: {}, details: {}};
}
export function record_selectPrimaryRelatedProduct(record: I_ProductRecord, index: IndexedDetailAggregate = getEmptyDetailAggregator()) {
    const relatedProductid     = record.detail.primaryRelatedProduct;
    const primaryProductRecord = index.relatedProducts[relatedProductid ?? 'unknown'];
    return primaryProductRecord ? primaryProductRecord.relatedProduct.name : 'unknown';
}