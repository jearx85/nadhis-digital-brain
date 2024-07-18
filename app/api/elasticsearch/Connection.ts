import { Client } from '@elastic/elasticsearch';


//Conexion con elasticsearch
export function conn(): Client {
  const client = new Client({
    node: ['https://10.11.230.21:9200', 'https://10.11.230.22:9200', 'https://10.11.230.23:9200', 'https://10.11.230.25:9200'],
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      apiKey: 'X3dqNXpvUUJFUVc4d0VBYlNzb2o6a3prVmVkajhSdVcya1F6cGFUbko5Zw=='
    }

  })
  return client;
}

//Validar que la conexion funciona

const client = conn();
client.ping()
  .then(response => {
    console.log("Conexion exitosa ");
  })
  .catch(error => {
    console.error('Failed to connect to Elasticsearch:', error);
  });