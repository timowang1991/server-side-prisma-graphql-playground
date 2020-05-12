import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import axios from 'axios';

const {
    PORT,
    TARGET_SCHEMA_URL
} = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/playground', async (req, res, next) => {
    const { data: schema } = await axios.get('http://suppressbress.corp.gq1.yahoo.com:4080/api/v1/gql/schema' || TARGET_SCHEMA_URL);

    expressPlayground({
        endpoint: '/graphql',
        schema,
        settings: {
            'schema.polling.enable': false,
        },
    })(req, res, next);
});

app.use('/graphql', async (req, res, next) => {
    const { query, variables } = req.body;
    try {
        const {
            data
        } = await axios.get(`http://suppressbress.corp.gq1.yahoo.com:4080/api/v1/gql/query?query=${encodeURIComponent(query)}`)
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT || 3000, () => {
    console.log('server listening on', PORT || 3000);
});
