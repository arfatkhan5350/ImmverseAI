/** 
 * @swagger 
 * definitions:
 *   addtodoDef:
 *     properties:
 *       todoItem:
 *         type: string
 *         required: true
 *         description: Enter email.
 *      
 */
/** 
 * @swagger
/users/addtodo: 
*   post: 
*     description: add todo.
*     tags:
*     - ToDo
*     summary: add todo.
*     parameters: 
*     - name: Model 
*       description: add todo.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/addtodoDef'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Logged in Successful
*       402: 
*         description: Failed to authenticate token
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/