/** 
 * @swagger 
 * definitions:
 *   registrationDef:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *         description: Enter email.
 *       password:
 *         type: string
 *         required: true
 *         description: Enter password.
 */
/** 
 * @swagger
/users/registration: 
*   post: 
*     description: Login User by email.
*     tags:
*     - User
*     summary: Login by email.
*     parameters: 
*     - name: Model 
*       description: Login with email.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/registrationDef'
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