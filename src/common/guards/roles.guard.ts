import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

const matchRoles = (roles: string[], userRoles: string[]) => {
    return userRoles.some(userRole => roles.includes(userRole));
};

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Retrieve roles from the metadata using ROLES_KEY
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!roles) {
            return true;  // If no roles are specified, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // If user roles do not match the required roles, throw an exception
        if (!matchRoles(roles, user.roles)) {
            throw new ForbiddenException(`You do not have permission (Roles: ${roles.join(', ')}) to access this resource`);
        }

        return true;  // If roles match, allow access
    }
}
