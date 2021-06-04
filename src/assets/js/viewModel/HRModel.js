import {getImageUrl} from "assets/js/getImage";
import {PostModel} from "assets/js/viewModel/PostModel";

export function HRModel(hrBean, withSpecificInfo = true) {
    let humanResource = hrBean.hr
    let company = humanResource.refCompany
    let posts = []
    if (withSpecificInfo && hrBean.posts) {
        for (let post of hrBean.posts) {
            posts.push(PostModel(post, false))
        }
    }
    return {
        id: humanResource.id,
        name: humanResource.name,
        email: humanResource.email,
        postName: humanResource.postName,
        avatarUrl: getImageUrl(humanResource.avatarUrl),
        introduction: humanResource.introduction,
        posts: posts,
        company: withSpecificInfo ? {
            id: company.id,
            name: company.name,
            location: company.location,
            logoUrl: getImageUrl(company.logoUrl),
            headCount: company.headCount,
            introduction: company.introduction,
            companyType: {
                id: company.refCompanyType.id,
                name: company.refCompanyType.name
            }
        } : null,
    }
}
