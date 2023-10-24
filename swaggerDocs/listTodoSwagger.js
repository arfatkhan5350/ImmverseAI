/**
 * @swagger
 * /users/listtodo:
 *   get:
 *     description: Get All ToDos.
 *     tags:
 *       - ToDo
 *     summary: Get All ToDos List.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page.
 *         required: false
 *         type: integer
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
