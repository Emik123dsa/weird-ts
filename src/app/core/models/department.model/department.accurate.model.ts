export interface DepartmentAccurate {
  id: string,

  name: string,
  API_SCHEMA_KEY: string,

  email: string,
  telephone: string,
  owner: string,

  additional_fields?: { [key: number]: string },

  photo_vendor?: string,
  activated?: boolean
}