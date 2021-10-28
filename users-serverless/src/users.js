'use strict';



module.exports.getUsers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'get Users',
        input: event,
      },
      null,
      2
    ),
  };
};


module.exports.postUsers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'post Users',
        input: event,
      },
      null,
      2
    ),
  };
};



module.exports.putUsers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'put Users',
        input: event,
      },
      null,
      2
    ),
  };
};



module.exports.deleteUsers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'delete Users',
        input: event,
      },
      null,
      2
    ),
  };
};
