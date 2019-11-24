import React from 'react';
import {useModule, getQiitaState} from './index'

import {Card, CardContent, Typography, Grid, Link, Chip} from '@material-ui/core/.';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search_tag: {
      color: '#fff',
      marginBottom: 10,
    },
    card: {
      maxWidth: 275,
    },
    tags: {
      marginBottom: 12,
    },
    tag: {
      marginRight: theme.spacing(1),
      marginBottom: 5,
    },
    title: {
      marginBottom: 10,
    }
  }));

export function ItemList() {
    useModule();

    const classes = useStyles();
    const { items, tags } = getQiitaState.useState();
  
    return (
      <div>
        <div className={classes.search_tag}>
          検索タグ : {tags.idsString}
        </div>
        <div>
          <Grid container spacing={3} justify="flex-start" direction="row">
            {items.map((x, index) =>
              <Grid item xs={4}>
                <Link href={x.url}>
                  <Card key={index}>
                    <CardContent>
                      <Grid container spacing={3} justify="flex-start" direction="row" className={classes.tags}>
                        {x.tags.map((tag, index) => 
                          <Chip className={classes.tag} color="primary" label={tag.id} />
                        )}
                      </Grid>
                      <Typography variant="h6" component="h2" className={classes.title} >
                        {x.title}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        いいね {x.likesCount}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        作成日：{x.createdAtView}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        更新日：{x.updatedAtView}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
                </Grid>
            )}
          </Grid>
        </div>
      </div>
    );
  }