import { Injectable } from '@angular/core';
import {Octokit} from "@octokit/core";
import {Issue} from "./news/Issue";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor() { }

  issues:Issue[] =[];

  async getArticles(): Promise<Issue[]> {
    this.issues=[]
    const octokit = new Octokit({auth: environment.GITHUB_TOKEN});

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'Chiwutang',
      repo: 'ChiwutangIndex'
    })


    response.data.map((issue) => {
      // if (issue.title.includes("test")) {
      // }

      this.issues.push({
        avatar_url: issue.user!.avatar_url,
        body: issue.body as string,
        created_at: issue.created_at as string,
        id: issue.number,
        login: issue.user!.login,
        title: issue.title as string,
        text: (issue.body as string).split("\r",2)[0]
      })

    })
    return this.issues
  }


  issue:Issue;

  async getArticle(id: string) {

    const octokit = new Octokit({auth: environment.GITHUB_TOKEN});

    const response =  await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: 'Chiwutang',
      repo: 'ChiwutangIndex',
      issue_number: Number(id)
    })

    this.issue={
      avatar_url: response.data.user!.avatar_url,
      body: response.data.body as string,
      created_at: response.data.created_at as string,
      id: response.data.number,
      login: response.data.user!.login,
      title: response.data.title as string,
      text: ''
    }

    return this.issue
  }

}
