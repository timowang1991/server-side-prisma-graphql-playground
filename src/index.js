import 'regenerator-runtime/runtime'; // eslint-disable-line

import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import axios from 'axios';
import isEmpty from 'lodash.isempty';

const {
    PORT = 5466,
    TARGET_QUERY_URL = 'http://localhost:4080/api/v1/gql/query',
    TARGET_INTROSPECT_URL = 'http://localhost:4080/api/v1/gql/introspect',
    WORKSPACE = 'default',
} = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/playground', expressPlayground({
    endpoint: '/graphql',
    settings: {
        'schema.polling.endpointFilter': '/introspect',
    },
    workspaceName: WORKSPACE,
}));

app.use('/graphql', async (req, res) => {
    const { query, variables } = req.body;

    const params = isEmpty(variables) ? {
        query,
    } : {
        query,
        variables,
    };

    try {
        const { data } = await axios.get(TARGET_QUERY_URL, { params });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.use('/introspect', async (req, res) => {
    try {
        const { data } = await axios.get(TARGET_INTROSPECT_URL);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.get('/', (req, res) => {
    res.redirect('/playground');
});

app.listen(PORT, () => {
    console.log('server listening on', PORT);
});
