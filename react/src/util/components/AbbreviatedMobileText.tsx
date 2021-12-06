export function AbbreviatedMobileText({
                                          text,
                                          scheme = 'true',
                                          split = ' ',
                                      }: { split?: string, scheme: string, text: string }) {
    const names = text.split(split);
    return (
        <div data-abbreviate={scheme}>{
            names.map(name => <span key={name} data-initial={`${name[0]}.`}>{name}</span>)
        }</div>
    )
}