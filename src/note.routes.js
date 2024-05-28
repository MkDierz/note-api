const { PrismaClient } = require('@prisma/client');
const { Router } = require('express');
const { checkToken } = require('../utils/middleware');

const prisma = new PrismaClient();
const router = new Router();
router.use(checkToken);

async function GetAllCheklist(req, res) {
  /*
  #swagger.security = [{"bearerAuth": []}]
  */
  return res.send(await prisma.cheklist.findMany({
    where: { userId: req.auth.id },
  }));
}

async function CreateNewCheklist(req, res) {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'create new cheklist.',
            schema: {
                $name: 'cheklist name',
            }
    }
    #swagger.security = [{"bearerAuth": []}]
  */
  const { name } = req.body;
  await prisma.cheklist.create({
    data: {
      name,
      userId: req.auth.id,
    },
  });
  return res.send();
}

async function DeleteCheklist(req, res) {
  /*
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

router.get('/checklist', GetAllCheklist);
router.post('/checklist', CreateNewCheklist);
router.delete('/checklist/:checklistId', DeleteCheklist);
router.get('/checklist/:checklistId/item', GetAllChecklistItemByChecklistId);
router.post('/checklist/:checklistId/item', CreateNewChecklistItemInChecklist);
router.get('/checklist/:checklistId/item/:checklistItemId', GetChecklistItemInChecklistByChecklistId);
router.put('/checklist/:checklistId/item/:checklistItemId', UpdateStatusChecklistItemByChecklistItemId);
router.delete('/checklist/:checklistId/item/:checklistItemId', DeleteItemByChecklistItemId);
router.put('/checklist/:checklistId/item/rename/:checklistItemId', RenameItemByCheclistItemId);

module.exports = router;
