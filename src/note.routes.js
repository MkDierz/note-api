const { PrismaClient } = require('@prisma/client');
const { Router } = require('express');
const { body } = require('express-validator');
const { checkToken } = require('../utils/middleware');
const errorHandler = require('../utils/errorHandler');

const prisma = new PrismaClient();
const router = new Router();
router.use(checkToken);

async function GetAllCheklist(req, res) {
  /*
  #swagger.tags = ['Checklist']
  #swagger.security = [{"bearerAuth": []}]
  */
  const data = await prisma.cheklist.findMany({
    where: { userId: req.auth.id },
  });
  return res.send(data);
}

async function CreateNewCheklist(req, res) {
  /*
  #swagger.tags = ['Checklist']
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'create new cheklist.',
    schema: {
      $name: 'cheklist name'
    }
  }
  #swagger.security = [{"bearerAuth": []}]
  */
  const { name } = req.body;
  const data = await prisma.cheklist.create({
    data: {
      name,
      userId: req.auth.id,
    },
  });
  return res.send(data);
}

async function DeleteCheklist(req, res) {
  /*
  #swagger.tags = ['Checklist']
  #swagger.security = [{"bearerAuth": []}]
  */
  const data = await prisma.cheklist.delete({
    where: {
      id: parseInt(req.params.checklistId, 10),
      userId: req.auth.id,
    },
  });
  return res.send(data);
}

async function GetAllChecklistItemByChecklistId(req, res) {
  /*
  #swagger.tags = ['Checklist Item']
  #swagger.security = [{"bearerAuth": []}]
  */
  const data = await prisma.cheklistItem.findMany({
    where: {
      cheklist: {
        userId: req.auth.id,
      },
      cheklistId: parseInt(req.params.checklistId, 10),
    },
  });
  return res.send(data);
}

async function CreateNewChecklistItemInChecklist(req, res) {
  /*
  #swagger.tags = ['Checklist Item']
  #swagger.security = [{"bearerAuth": []}]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'create new cheklist item.',
    schema: {
      $itemName: 'cheklist name',
    }
  }
  */
  const data = await prisma.cheklistItem.create({
    data: {
      cheklistId: parseInt(req.params.checklistId, 10),
      itemName: req.body.itemName,
    },
  });
  return res.send(data);
}

async function GetChecklistItemInChecklistByChecklistId(req, res) {
  /*
  #swagger.tags = ['Checklist Item']
  #swagger.security = [{"bearerAuth": []}]
  */
  const {
    checklistId,
    checklistItemId,
  } = req.params;
  const data = await prisma.cheklistItem.findMany({
    where: {
      cheklistId: parseInt(checklistId, 10),
      id: parseInt(checklistItemId, 10),
    },
  });

  return res.send(data);
}

async function UpdateStatusChecklistItemByChecklistItemId(req, res) {
  /*
  #swagger.tags = ['Checklist Item']
  #swagger.security = [{"bearerAuth": []}]
  */
  const {
    checklistId,
    checklistItemId,
  } = req.params;

  const data = await prisma.cheklistItem.update({
    where: {
      cheklist: {
        userId: req.auth.id,
      },
      cheklistId: parseInt(checklistId, 10),
      id: parseInt(checklistItemId, 10),
    },
    data: {
      status: true,
    },
  });

  return res.send(data);
}

async function DeleteItemByChecklistItemId(req, res) {
  /*
  #swagger.tags = ['Checklist Item']
  #swagger.security = [{"bearerAuth": []}]
  */
  const {
    checklistId,
    checklistItemId,
  } = req.params;
  const data = await prisma.cheklistItem.delete({
    where: {
      cheklist: {
        userId: req.auth.id,
      },
      cheklistId: parseInt(checklistId, 10),
      id: parseInt(checklistItemId, 10),
    },
  });
  return res.send(data);
}

async function RenameItemByCheclistItemId(req, res) {
  /*
  #swagger.tags = ['Checklist Item']
  #swagger.security = [{"bearerAuth": []}]
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'rename cheklist item.',
            schema: {
                $itemName: 'cheklist name',
            }
    }
  */
  const {
    checklistId,
    checklistItemId,
  } = req.params;
  const data = await prisma.cheklistItem.update({
    where: {
      userId: req.auth.id,
      checklistId,
      id: checklistItemId,
    },
    data: {
      itemName: req.body.itemName,
    },
  });

  return res.send(data);
}

const cheklistField = body('name').isString().notEmpty().withMessage('name is required');
const cheklistItemField = body('name').isString().notEmpty().withMessage('name is required');

router.get('/checklist', GetAllCheklist);
router.post('/checklist', cheklistField, errorHandler.validation, CreateNewCheklist);
router.delete('/checklist/:checklistId', DeleteCheklist);
router.get('/checklist/:checklistId/item', GetAllChecklistItemByChecklistId);
router.post('/checklist/:checklistId/item', cheklistItemField, errorHandler.validation, CreateNewChecklistItemInChecklist);
router.get('/checklist/:checklistId/item/:checklistItemId', GetChecklistItemInChecklistByChecklistId);
router.put('/checklist/:checklistId/item/:checklistItemId', cheklistItemField, errorHandler.validation, UpdateStatusChecklistItemByChecklistItemId);
router.delete('/checklist/:checklistId/item/:checklistItemId', DeleteItemByChecklistItemId);
router.put('/checklist/:checklistId/item/rename/:checklistItemId', RenameItemByCheclistItemId);

module.exports = router;
