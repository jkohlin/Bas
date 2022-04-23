export const translate = str => {
  const keys = {
    IsBasic:
      'Kontot ingår i det urval av konton som för de flesta företag är tillräckligt för en grundläggande bokföring.',
    NotAllowedInK2:
      'Kontot används inte av de företag som valt att tillämpa K2-regler',
    ValidForOrganizationTypes: 'Giltig för följande organisationstyper',
    NormalTransaction: 'Normala transaktionssidan',
    NormalBalance: 'Normala balanskontosidan',
    TaxFormReferences: 'SRU-kopplingar',
    liability: 'Obeskattade reserver',
    Indeterminate: 'SRU-kod saknas',
    AccountNumber: 'Kontonummer',
    ownersEquity: 'Eget kapital',
    SwedishName: 'Kontonamn',
    TaxForm: 'Blankett',
    asset: 'Tillgång',
    IsGroup: 'Grupp',
    income: 'Intäkt',
    cost: 'Utgift',
    Code: 'SRU-kod',
    Type: 'Typ',
    EA: 'Ekonomisk förening',
    NPO: 'Ideell förening',
    JP: 'Samfällighet',
    ST: 'Enskild firma',
    RRC: 'Registrerat trossamfund',
    PA: 'Handelsbolag och Kommanditbolag',
    LTD: 'Aktiebolag',
    FO: 'Stiftelse',
    ALL: 'Alla',
    both: 'Debet & Kredit',
    debit: 'Debet',
    credit: 'Kredit',
  }
  return keys[str] || str
}
