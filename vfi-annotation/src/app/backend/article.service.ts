import { Injectable } from '@angular/core';
import { ArticleModel } from './article.model';
import { ArticlesModel } from './articles.model';

@Injectable({ providedIn: 'root' })
/**
 * Article Service class used in managing localStorage database.
 */
export class ArticleService {

    /** The localStorage key for the Articles database. */
    private readonly articlesDB: string = 'articlesDB_LocalStorage_Key';

    /**
     * Initializes a new instance of ArticleService class.
     */
    constructor() { }

    /**
     * Retrieves all the Articles from localStorage database.
     * @returns {ArticlesModel} The entire Articles database from localStorage.
     */
    private readArticles(): ArticlesModel {
        return JSON.parse(localStorage.getItem(this.articlesDB));
    }   

    /**
     * Retrieves a specific Article from localStorage database.
     * @param {string} id ID of the Article to retrieve.
     * @returns {ArticleModel} The Article object.
     */
    public readArticle(id: string): ArticleModel {
        return this.readArticles().articles.find((x: ArticleModel) => x.id === id);
    }





    /**
     * Resets the users DB local storage.
     * @param {ArticlesModel} articles Optional. If not supplied, uses default values.
     */
    public resetDatabase(articles?: ArticlesModel): void {
        localStorage.removeItem(this.articlesDB);
        if (!articles) {
            localStorage.setItem(this.articlesDB, JSON.stringify(this.articlesDBDefault));
        }
        else {
            localStorage.setItem(this.articlesDB, JSON.stringify(articles));
        }
    }   

    /**
     * Initializes the users DB.
     * @privateRemarks Helper function. Special use ONLY for this program.
     * @returns {boolean} True is successful. Otherwise, false (DB already exists).
     */
    public initializeDatabase(): boolean {
        if (!localStorage.getItem(this.articlesDB)) {
            localStorage.setItem(this.articlesDB, JSON.stringify(this.articlesDBDefault));
            return true;
        }

        return false;
    }

    /**
     * Default Users database.
     * @privateRemarks This is used ONLY for initializing the database.
     * @remarks The password is 'password' sans the quotes.
     */
    private readonly articlesDBDefault = {
        "articles": [
            {
                "id": "lorem-ipsum",
                "title": "Lorem Ipsum",
                "body": "Lorem ipsum dolor sit amet, adipiscing elit. Aenean dictum elementum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut porta venenatis velit, ac scelerisque nisi lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In pellentesque elementum dolor vel aliquam. Integer maximus mattis nisi non efficitur. Nam elementum venenatis nibh sed feugiat. Aliquam a diam sed nulla lobortis sollicitudin ac vel lorem.\\n\\n Duis eu dui id sem dapibus sodales egestas et arcu. Aenean convallis nunc eu risus bibendum efficitur. Aenean congue sapien a tortor aliquam rhoncus. Nulla blandit suscipit justo, ac tincidunt mauris pharetra in. Phasellus congue congue convallis. Nullam feugiat nisl vel gravida rutrum. Vestibulum id quam gravida, gravida mauris id, bibendum nulla. Fusce vitae felis malesuada, mattis sem a, mattis risus.\\n\\n  Aenean mollis, leo et consectetur tincidunt neque porttitor sapien, luctus auctor magna mi vel ante. suscipit tortor sed leo tincidunt egestas. Integer eu dui dapibus, lacinia purus quis, tempor sem. Morbi in malesuada justo. Morbi et neque tincidunt, consectetur lacus nec, ornare velit. Ut sit amet laoreet massa. Sed a erat risus. Aenean vulputate diam augue, non egestas velit tristique id. Suspendisse potenti.\\n\\n Praesent sollicitudin, quam nec tempor molestie, elit vehicula quam, fringilla fermentum massa nulla eu elit. Nullam nec egestas arcu, ac maximus odio. Integer ac vulputate libero. In ac dui eget felis laoreet placerat. Morbi dapibus turpis at enim ultricies, eget venenatis risus elementum. Cras molestie arcu eget magna tristique, nec tristique tellus venenatis. Praesent at scelerisque velit. Cras nec est magna. Vivamus vitae porta dolor. Vivamus felis dui, tincidunt ac nisl non, suscipit luctus metus.\\n\\n Nullam viverra ante nunc, eget ullamcorper lacus fringilla vel. Nam non dui ex. Vivamus nunc lacus, mollis eget lectus in, finibus molestie tellus. Etiam interdum libero enim, pretium laoreet mauris volutpat vel. Ut ornare ultrices velit, a rutrum odio blandit non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla pharetra odio ut nulla aliquam sagittis. Quisque nisl orci, fringilla et tellus ut, ornare vehicula nulla. Quisque condimentum et massa ut aliquam. Integer vestibulum tellus sed dui vehicula,\\n\\n eu elementum elit varius. Aenean libero dolor, vulputate quis vitae, laoreet sit amet felis. Pellentesque sit amet laoreet sem, sit amet scelerisque arcu. Praesent pulvinar mauris a finibus porttitor. Aenean sodales convallis mi, quis tincidunt ante consequat.",
                "annotations": [
                    {
                        "id": "0-4",
                        "author": "admin",
                        "comment": "",
                        "startIndex": 0,
                        "finalIndex": 4,
                        "tag": [ "tag x", "start" ]
                    },
                    {
                        "id": "6-6",
                        "author": "admin",
                        "comment": "",
                        "startIndex": 6,
                        "finalIndex": 6,
                        "tag": [ "tag x" ]
                    },
                ]
            }
        ]
    };
}
