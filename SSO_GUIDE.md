# 🏢 Synthera Enterprise SSO — Clerk Configuration Guide

Synthera uses Clerk for identity management. To enable Enterprise SSO (SAML, OIDC, or social OAuth) for your organization, follow these steps in the Clerk Dashboard.

## 1. Enable SSO Providers
- Go to [Clerk Dashboard](https://dashboard.clerk.com) > **User & Authentication** > **SSO Connections**.
- Click **Add Connection** and select your provider (e.g., Google Workspace, Microsoft Entra ID, Okta).

## 2. SAML 2.0 Configuration (Optional)
If your enterprise clients require SAML:
- Follow the provider-specific instructions to exchange metadata.
- Clerk will provide a **Reply URL** and **Entity ID** for you to give to the client.

## 3. Redirect URLs
Ensure the following are whitelist in your Clerk project:
- **Sign-in URL**: `http://localhost:3000/login`
- **Sign-up URL**: `http://localhost:3000/signup`
- **After sign-in**: `http://localhost:3000/dashboard`

## 4. Frontend Integration
The Synthera frontend is already configured to support the default Clerk `SignIn` and `SignUp` components, which automatically display enabled SSO providers. No code changes are required for new providers once they are enabled in the dashboard.

---
*For further assistance, refer to the [Clerk SSO Documentation](https://clerk.com/docs/authentication/enterprise-sso).*
