export default {
    name: "nest",
    age: "20ms",
    env: "dev",
    db: {
        mssql: {
            user: 'vbtax',
            password: 'eiipl201%',
            server: '182.74.100.226', // You can use 'localhost\\instance' to connect to named instance
            database: 'db_wbvbtaxation_12042019_dprOnly',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
              },
              options: {
                encrypt: false, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
              }
        }
    }
}