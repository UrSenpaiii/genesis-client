type Token = { access_token: string, base_domain: string }
type CreateInstanceRes = { id: number, type: string }
type Instance = { id: number, name: string }
type SelectItem = { type: string, displayName: string, instanceNamePrefix: string }

export type {
    Token, CreateInstanceRes, Instance, SelectItem
}