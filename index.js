import fs from "fs";
import http from "http";
import path from "path";
import methods from "methods";
import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import errorhandler from "errorhandler";
import { connect, set } from "mongoose";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const isProduction = process.env.NODE_ENV === "production";

// Create global app object
const app = express();

app.use(cors());

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: 'Author\'s Haven',
    version: '1.0.0',
    description: 'A Social platform for the creative at heart',
  },
  host: 'https://kingsmen-ah-backend-staging.herokuapp.com/',
  basePath: '/api/v1'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['swagger.yaml']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// swagger-ui-express for app documentation endpoint
app.use('/swagger.yaml', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Normal express config defaults
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("method-override")());
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "authorshaven",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/conduit");
  mongoose.set("debug", true);
}

require("./models/User");

app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});
