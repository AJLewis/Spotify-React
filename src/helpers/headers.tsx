// I have no idea the best practice for this. Should headers be created directly in the component, what if they are needed in multiple places?
// This seemed like a reasonable solution to the 'shared' problem, I will be interested in hearing how to best handle this.

export const token_request = {
  method: "POST",
  headers: {
    "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
    "Authorization" : "Basic M2YwODRlYjk4Njc1NDdjNDk3MTExN2E4NjY0ZTI3N2Q6Y2NhOGQ0NTc4YTZmNGE0YmJmMmExN2MzMmJjYTNmNzk="
  },
  body: "grant_type=client_credentials"
}

export const getTokenHeader = (token: string) => {
  return {
    "Authorization" : `Bearer ${token}`
  }
}