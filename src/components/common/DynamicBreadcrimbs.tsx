import {
  Breadcrumbs,
  Link,
  Typography,
  type BreadcrumbsProps,
} from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface DynamicBreadcrumbsProps {
  items: BreadcrumbItem[];
  props?: BreadcrumbsProps;
}

const DynamicBreadcrumbs = ({ items, props }: DynamicBreadcrumbsProps) => {
  return (
    <Breadcrumbs sx={{ textDecoration: 'none', ...props?.sx }} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography key={item.label} color="text.primary">
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            component={ReactRouterLink}
            key={item.label}
            to={item.path || '#'}
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default DynamicBreadcrumbs;
