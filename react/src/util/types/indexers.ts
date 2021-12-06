/**
 * Types for Indexers.
 *
 * "Indexers" are a helpful way to associate how data is rendered with how data is selected
 */

export type IndexerKey =
    {
        title: string;
        subtitle?: string;
        attrName: string;
        className: string;
    };

export type IndexerDatumSelector<Node = any, Datum = any> =
    (node: Node) => Datum;

export type Indexer<Key extends IndexerKey = IndexerKey, Selector extends IndexerDatumSelector = any> = [Key, Selector]