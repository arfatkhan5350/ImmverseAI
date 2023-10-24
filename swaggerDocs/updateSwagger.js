/**
 * @swagger
 * definitions:
 *   updateTodoDef:
 *     properties:
 *       todoItem:
 *         type: string
 *         required: true
 *         description: Enter email.
 */
/** 
 * @swagger
/users/updatetodo/{id}: 
*   put: 
*     description: update ToDo.
*     tags:
*     - ToDo
*     summary: update ToDo .
*     parameters: 
*     - name: id 
*       in: path 
*       description: Enter id.
*       required: true 
*       type: string
*     - name: Model 
*       description: Login with email.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/updateTodoDef'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
*       401: 
*         description: Failed to authenticate token
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/
