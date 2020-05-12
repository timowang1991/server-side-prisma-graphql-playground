import "regenerator-runtime/runtime";

import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import axios from 'axios';
import isEmpty from 'lodash.isempty';

const {
    PORT = 3000,
    TARGET_QUERY_URL,
    TARGET_INTROSPECT_URL,
} = process.env;

const FALLBACK_QUERY_URL = 'http://localhost:4080/api/v1/gql/query';
const FALLBACK_INTROSPECT_URL = 'http://localhost:4080/api/v1/gql/introspect';

const app = express();

app.use(bodyParser.json());

app.use('/playground', expressPlayground({
    endpoint: '/graphql',
    settings: {
        'schema.polling.endpointFilter': '/introspect',
    },
}));

app.use('/graphql', async (req, res, next) => {
    const { query, variables } = req.body;

    const params = isEmpty(variables) ? {
        query,
    } : {
        query,
        variables
    };

    try {
        const { data } = await axios.get(TARGET_QUERY_URL || FALLBACK_QUERY_URL, { params });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.use('/introspect', async (req, res) => {
    try {
        const { data } = await axios.get(TARGET_INTROSPECT_URL || FALLBACK_INTROSPECT_URL);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
})

app.listen(PORT, () => {
    console.log('server listening on', PORT);
});
