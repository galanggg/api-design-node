import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './handlers/product'
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  update,
} from './handlers/update'
import { handleInputErrors } from './modules/middleware'
const router = Router()
/**Product**/
router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct,
)
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct,
)
router.delete('/product/:id', handleInputErrors, deleteProduct)

/**Update**/
router.get('/update', getUpdates)
router.get('/update/:id', getUpdate)
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
  body('version').optional(),
  body('asset').optional(),
  update,
)
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  createUpdate,
)
router.delete('/update/:id', deleteUpdate)

/**Update Point**/
router.get('/updatepoint', (req, res) => {})
router.get('/updatepoint/:id', (req, res) => {})
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => {},
)
router.post(
  '/updatepoint',
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('updateId').exists().isString(),
  (req, res) => {},
)
router.delete('/updatepoint/:id', (req, res) => {})

export default router
