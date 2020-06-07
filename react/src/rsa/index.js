import JSEncrypt from 'encryptlong';

// 私钥内容
const PRIV_KEY = `MIICXgIBAAKBgQDB2hvfZdN7Wl4qgBQRHWcJhaShEQviB3wcoZ8zCjTyInNYbcXE
yQNHKYdb5CJrM7C0ZS51UKjBos7P+h4qITlMrZQTK5d92l4jfammEEsOsKtctEZk
3KZaw1nREtNnY3NCG3jE/yiPVql+oZBaUA0pVPsOOcROL9/u408cpNnmGwIDAQAB
AoGBAJ6eEjp8fkwryGtsO385mMrg0LF+WkPLrhFbagGAc4xBBjKwN6fqdsUuxPQ6
urMPK6KgPCCALGWtCx6AYVhFsTSPZEeGFxUgSZMnUP5GEP9yMMUobeF3JareGMFM
iW7SRrsE9eONDECrQnTdXKQm6SFTbeii9inUWEEqx6eCwiG5AkEA9fxDaN/IPctl
ugwxNjILyOMS6ozGOS9yAUbkF58IYSe+yl22COhairXJxc1UXskTRzzHrm3GieT7
KPo44jP7HwJBAMm+fqydynn+GC6ir5IO8NXXT1zp3rMDLjDTRMuuh0/CH6nM37vt
2TAhqz6kGuM9KbIRr0i7zeJcLfM5EiHIsYUCQA0TqBG/M8n1Mic91q/m4TGAwNSv
PypzF0ByIFYRIkTn9ACWEsNOduHA4EUfsUiIr/mthYAEXfWesqtvAe8kjEkCQQC1
Xyx1NZq92CGXc60SS5pbNank52DOYVKalKVp1GtT2jsrJcQTKT80FWDl/RUrLGaa
72k9o5HyKlspKirR8qMdAkEAoPBCg3JlgBcWJvTZcqfTWaKAAF2gO3siDXXUknue
mQelz32NOl41ijTYG9eyiwOrQxzy8raeGJ1QZfOyzWIPKA==`;

// 公钥内容
const PUB_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDB2hvfZdN7Wl4qgBQRHWcJhaSh
EQviB3wcoZ8zCjTyInNYbcXEyQNHKYdb5CJrM7C0ZS51UKjBos7P+h4qITlMrZQT
K5d92l4jfammEEsOsKtctEZk3KZaw1nREtNnY3NCG3jE/yiPVql+oZBaUA0pVPsO
OcROL9/u408cpNnmGwIDAQAB`;

// 公钥加密
export function encrypt(text) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);
    const encrypted = encrypt.encryptLong(text);
    return encrypted;
}

// 私钥解密
export function decrypt(text) {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(PRIV_KEY);
    const decrypted = decrypt.decryptLong(text);
    return decrypted;
}