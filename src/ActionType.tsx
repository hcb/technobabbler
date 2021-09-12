export enum WordActionType {
    Verb = "verb",
    Noun = "noun",
    Adjective = "adjective",
    Secondary = "secondary",
    All = "all"
}

export type Roll = {
    value: number,
    content: string
}

export type ActionType = 
    | { type: WordActionType.Verb, payload: Roll}
    | { type: WordActionType.Noun, payload: Roll}
    | { type: WordActionType.Adjective, payload: Roll}
    | { type: WordActionType.Secondary, payload: Roll}
    | { type: WordActionType.All, payload: object };

